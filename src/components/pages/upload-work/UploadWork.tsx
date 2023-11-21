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
  { label: 'Відкритий доступ', value: 'Відкритий доступ' },
  { label: 'Ліцензія на читання', value: 'Ліцензія на читання' },
  { label: 'Ліцензія на завантаження', value: 'Ліцензія на завантаження' },
  { label: 'Ліцензія на комерційне використання', value: 'Ліцензія на комерційне використання' },
  { label: 'Ексклюзивна ліцензія', value: 'Ексклюзивна ліцензія' }
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
    // init()

    // if (!web3 || !selectedAccount) return

    // const contract = new web3.eth.Contract(UploadWorkContract.abi, contractAddress)

    // const workHash = '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234'
    // const metadata = {
    //   ...data,
    //   licence: data.licence.value,
    //   tags: data.tags.map((tag) => tag.value)
    // }
    // const licenseType = 1 // Замените на нужное значение

    // contract.methods
    //   .registerWork()
    //   .send({ from: selectedAccount })
    //   .on('transactionHash', (hash) => {
    //     console.log('Transaction Hash: ', hash)
    //   })
    //   // .on('confirmation', (confirmationNumber, receipt) => {
    //   //   console.log('Confirmation Number: ', confirmationNumber)
    //   //   console.log('Receipt: ', receipt)
    //   // })
    //   .on('error', console.error)
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
    </div>
  )
}
