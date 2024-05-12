import { Skeleton } from '@/components/ui/skeleton'

const BookListSkeleton = () => {
    return (
        <div className='flex flex-col justify-start'>
            <div className='flex flex-col space-y-[30px] mt-[30px]'>
                <Skeleton className='w-full h-[20px] ' />
                <div className='flex flex-row items-center justify-start flex-wrap'>
                    <Skeleton className='w-[400px] h-[250px] m-[5px]' />
                    <Skeleton className='w-[400px] h-[250px] m-[5px]' />
                </div>
            </div>
            <div className='flex flex-col space-y-[30px] mt-[30px]'>
                <Skeleton className='w-full h-[20px] ' />
                <div className='flex flex-row items-center justify-start flex-wrap'>
                    <Skeleton className='w-[400px] h-[250px] m-[5px]' />
                    <Skeleton className='w-[400px] h-[250px] m-[5px]' />
                </div>
            </div>
            <div className='flex flex-col space-y-[30px] mt-[30px]'>
                <Skeleton className='w-full h-[20px]' />
                <div className='flex flex-row items-center justify-start flex-wrap'>
                    <Skeleton className='w-[400px] h-[250px] m-[5px]' />
                    <Skeleton className='w-[400px] h-[250px] m-[5px]' />
                </div>
            </div>
        </div>
    )
}

export default BookListSkeleton