import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { AuthInput } from 'ui/AuthForm/AuthInput'
import { ErrorMessage } from 'ui/AuthForm/ErrorMessage'
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
  licence: string
}

const licenseOptions = [
  { label: 'Відкрита', value: 'OPEN' },
  { label: 'Закрита', value: 'CLOSED' }
]

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  tags: yup.array().required('Tags is required'),
  price: yup.number().required('Price is required'),
  licence: yup.object().required('License is required')
})

export const UploadWork = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<UploadForm>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<UploadForm> = async (data) => {
    console.debug(data)
    init()

    if (!web3 || !selectedAccount) return

    const contract = new web3.eth.Contract(UploadWorkContract.abi, contractAddress)

    const workHash = '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234'
    const metadata = {
      ...data,
      licence: data.licence.value,
      tags: data.tags.map((tag) => tag.value),
      asdasd: 'asdasd'
    }
    const licenseType = data.licence.value === 'OPEN' ? 0 : 1

    contract.methods
      .registerWork(workHash, JSON.stringify(metadata), licenseType)
      .send({ from: selectedAccount })
      .on('transactionHash', (hash) => {
        console.log('Transaction Hash: ', hash)
      })
      .on('error', console.error)
  }

  return (
    <div className='max-w-xl w-full mx-auto'>
      <h1 className='font-medium mb-6 text-center text-2xl'>Upload Work</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput register={register('title')} label='Title' />
        <ErrorMessage errors={errors.title} name='title' />
        <AuthInput register={register('description')} label='Description' />
        <ErrorMessage errors={errors.description} name='description' />
        <AuthInput register={register('price')} label='Price' />
        <ErrorMessage errors={errors.price} name='price' />
        <Controller
          control={control}
          name='licence'
          render={({ field: { value, onChange } }) => (
            <Select
              isSearchable={false}
              options={licenseOptions}
              value={value}
              onChange={onChange}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: '40px',
                  backgroundColor: 'transparent',
                  marginBottom: '10px'
                })
              }}
              placeholder='Ліцензія'
            />
          )}
        />
        <ErrorMessage errors={errors.licence} name='licence' />
        <Controller
          control={control}
          name='tags'
          render={({ field: { value, onChange } }) => (
            <CreatableSelect
              isClearable
              isMulti
              options={[]}
              value={value}
              onChange={onChange}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: '40px',
                  backgroundColor: 'transparent',
                  marginBottom: '10px'
                })
              }}
              placeholder='Теги'
            />
          )}
        />
        <ErrorMessage errors={errors.tags} name='tags' />
        <Button type='submit' sx={{ width: '100%', maxWidth: '200px' }} variant='outlined'>
          Upload
        </Button>
      </form>
      <Button
        sx={{ width: '100%', maxWidth: '200px' }}
        variant='outlined'
        onClick={() => {
          // 0x400079a11e8d171013b345fa3f45a0f33d4a58788666b99dff921da60a5fa1e6
          init()

          if (!web3 || !selectedAccount) return

          const contract = new web3.eth.Contract(UploadWorkContract.abi, contractAddress)
          contract.methods
            .getWork('0x400079a11e8d171013b345fa3f45a0f33d4a58788666b99dff921da60a5fa1e6')
            .send({ from: selectedAccount })
            .on('transactionHash', (hash, receipt) => {
              console.log('Transaction Hash: ', hash, receipt)
            })
            .on('receipt', (receipt) => {
              console.log('Transaction Hash: ', receipt)
            })
            .on('sending', (hash) => {
              console.log('Transaction Hash: ', hash)
            })
            .on('sent', (hash) => {
              console.log('Transaction Hash: ', hash)
            })
            .on('error', console.error)
        }}>
        get work
      </Button>
    </div>
  )
}
