import { useGetDocumentQuery } from 'api/index'
import { useParams } from 'react-router-dom'

export const Work = () => {
  const params = useParams()

  const id = params!.id as string

  const { data, isLoading } = useGetDocumentQuery(id, {
    skip: !id
  })

  if (isLoading) {
    return <div>Завантаження...</div>
  }

  if (!data) {
    return <div>Роботи не знайдено</div>
  }

  console.debug(data, 'data')

  return (
    <div className='w-fit mx-auto flex flex-col gap-2 border border-gray-300 p-4 rounded-lg'>
      <h1 className='font-bold'>{data.title}</h1>
      <p className='italic'>{data.description}</p>
      <div>
        Автор: {data.user_info.firstName} {data.user_info.lastName}
      </div>
      <div>Теги: {data.tags.map((tag: string) => `#${tag} `)}</div>
      <div>Тип ліцензії: {data.license_type === 'OPEN' ? 'Відкрита' : 'Закрита'}</div>
      <div>Ціна: {data.price}</div>
    </div>
  )
}
