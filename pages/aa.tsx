import type { NextPage } from 'next';
import { Carousel } from 'react-responsive-carousel';
import { Warpper } from '../layout';

export async function getStaticProps() {

    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({ include: { author: {} }, where: { published: true } });

    return { props: { posts } }
}

type PropsType = Awaited<ReturnType<typeof getStaticProps>>['props'];

const Home: NextPage<PropsType> = (props) => {


    return (
        <Warpper>
            
            <Carousel
                showThumbs={false}
                showStatus={false}
                interval={3000}
                infiniteLoop
                autoPlay
                className="mt-6">
                <div className='h-72'>
                    <img src="/crusel.jpg" className='h-full' />
                </div>
                <div className='h-72'>
                    <img src="/crusel2.jpg" className='h-full' />
                </div>
                <div className='h-72'>
                    <img src="/crusel3.jpg" className='h-full' />
                </div>
            </Carousel>
        </Warpper>

    )
}


export default Home
