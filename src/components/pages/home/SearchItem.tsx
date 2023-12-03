import { IWork } from 'api/index'
import { Link } from 'react-router-dom'

type Props = IWork & {
  index: number
}

export const SearchItem = ({ index, description, id, license_type, price, tags, title, user_info }: Props) => {
  return (
    <div className='flex flex-col gap-2 border border-gray-300 p-4 rounded-lg'>
      <h1>
        {index}. <span className='font-bold'>{title}</span>
      </h1>
      <p className='italic'>{description}</p>
      <div>
        Автор: {user_info.firstName} {user_info.lastName}
      </div>
      <div>Теги: {tags.map((tag) => `#${tag} `)}</div>
      <div>Тип ліцензії: {license_type === 'OPEN' ? 'Відкрита' : 'Закрита'}</div>
      <div>Ціна: {price}</div>
      <Link
        to={`/work/${id}`}
        className='text-white hover:bg-blue-500 transition-colors w-full block p-2 text-center rounded-lg bg-blue-400'>
        Переглянути
      </Link>
    </div>
  )
}
