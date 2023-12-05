import { useGetDocumentQuery } from 'api/index'
import { useParams } from 'react-router-dom'

export const Work = () => {
  const params = useParams()

  const id = params!.id as string

  const { data } = useGetDocumentQuery(id)

  console.debug(data, 'data')

  return <div>{id}</div>
}
