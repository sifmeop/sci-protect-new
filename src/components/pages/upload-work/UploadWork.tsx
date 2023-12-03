import { Button, Input } from '@mui/material'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { AuthInput } from 'ui/AuthForm/AuthInput'
import { ErrorMessage } from 'ui/AuthForm/ErrorMessage'
import styles from './UploadWork.module.scss'
import { useUploadWork } from './useUploadWork'

export const UploadWork = () => {
  const { register, handleSubmit, control, errors, onSubmit, file, setFile } = useUploadWork()

  return (
    <div className='max-w-xl w-full mx-auto'>
      <h1 className='font-medium mb-6 text-center text-2xl'>Завантажити роботу</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput register={register('title')} label='Заголовок' />
        <ErrorMessage errors={errors.title} name='title' />
        <AuthInput register={register('description')} label='Опис' />
        <ErrorMessage errors={errors.description} name='description' />
        <AuthInput register={register('price')} label='Ціна' />
        <ErrorMessage errors={errors.price} name='price' />
        <Controller
          control={control}
          name='licence'
          render={({ field: { value, onChange } }) => (
            <Select
              isSearchable={false}
              options={[
                { label: 'Відкрита', value: 'OPEN' },
                { label: 'Закрита', value: 'CLOSED' }
              ]}
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
        <div className={styles.fileWrapper}>
          <Input
            id='file'
            type='file'
            className={styles.inputFile}
            {...register('file')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.length) {
                setFile(e.target.files[0])
              }
            }}
          />
          <label htmlFor='file' className={styles.fileLabel}>
            {file ? 'Файл завантажено' : 'Завантажити файл'}
          </label>
          {file?.name && <p className='mb-[10px]'>{file.name}</p>}
        </div>
        <ErrorMessage errors={errors.file} name='file' />
        <Button
          type='submit'
          sx={{
            width: '100%',
            maxWidth: '200px'
          }}
          variant='outlined'>
          Завантажити
        </Button>
      </form>
    </div>
  )
}
