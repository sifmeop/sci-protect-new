import { yupResolver } from '@hookform/resolvers/yup'
import { useAddWorkMutation, useLazyIsUniqueDocQuery } from 'api/index'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { generateFileHash } from 'utils/generateFileHash'
import Web3 from 'web3'
import { RegisteredSubscription } from 'web3-eth'
import * as yup from 'yup'
import UploadWorkContract from './upload-work.contract.json'

const contractAddress = '0xa24d2C66c337b5D26355De4d6e2a512A7D423075'

let selectedAccount: string | null = null
let web3: Web3<RegisteredSubscription> | null = null

export const init = () => {
  const provider = window.ethereum

  if (typeof provider !== 'undefined') {
    provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        if (!!accounts && Array.isArray(accounts)) {
          selectedAccount = accounts[0]
        }
      })
      .catch((err) => {
        console.log(err)
      })
    window.ethereum!.on('accountsChanged', (accounts) => {
      if (!!accounts && Array.isArray(accounts)) {
        selectedAccount = accounts[0]
      }
    })
  }
  web3 = new Web3(provider)
}

interface Option {
  label: string
  value: string
}

interface UploadForm {
  title: string
  description: string
  tags: Option[]
  price: number
  licence: Option
  file: File[]
}

const uploadFormSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  tags: yup.array().required('Tags are required'),
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  licence: yup.object().required('Licence is required'),
  file: yup.string().required('File are required')
})

export const useUploadWork = () => {
  const [file, setFile] = useState<File | null>(null)
  const [checkIsUnique] = useLazyIsUniqueDocQuery()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<UploadForm>({
    resolver: yupResolver(uploadFormSchema)
  })

  const [addWorkMutation] = useAddWorkMutation()

  const onSubmit: SubmitHandler<UploadForm> = async (data) => {
    console.debug(data)

    if (file?.type !== 'application/pdf') {
      toast.error('Тільки PDF файли можна завантажувати')
      return
    }

    init()

    if (!web3 || !selectedAccount) return

    const contract = new web3.eth.Contract(UploadWorkContract.abi, contractAddress)

    const workHash = await generateFileHash(file!)
    console.debug(workHash, 'workHash')
    try {
      await checkIsUnique(workHash as string).unwrap()
      const formData = new FormData()
      formData.append('file', file!)
      formData.append('title', data.title)
      formData.append('description', data.description)
      data.tags.map((tag) => {
        formData.append('tags', tag.value)
      })
      formData.append('price', data.price.toString())
      formData.append('licence', data.licence.value)

      const metadata = {
        ...data,
        price: data.price.toString(),
        licence: data.licence.value,
        tags: data.tags.map((tag) => tag.value),
        file: formData
      }

      const licenseType = data.licence.value === 'OPEN' ? 0 : 1

      contract.methods
        // @ts-expect-error
        .registerWork('0x' + workHash, JSON.stringify(metadata), licenseType)
        .send({ from: selectedAccount })
        .on('transactionHash', (hash) => {
          console.log('Transaction Hash: ', hash)
          try {
            formData.append('txId', hash)
            addWorkMutation(formData)
              .unwrap()
              .then(() => {
                toast.success('Робота додана')
              })
          } catch (error) {
            console.debug('Error adding work: ', error)
            toast.error('Не вдалося завантажити роботу')
          }
        })
        .on('error', console.error)
    } catch (e) {
      toast.error('Така робота вже існує')
      return
    }
  }

  return { register, handleSubmit, control, errors, onSubmit, file, setFile }
}
