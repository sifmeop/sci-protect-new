interface Props {
  children: React.ReactNode
}

export const Main = ({ children }: Props) => {
  return (
    <main className='bg-[#F5F6FA]'>
      <div className='layout h-full'>{children}</div>
    </main>
  )
}
