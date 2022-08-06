import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {CalendarIcon} from "@heroicons/react/outline"

export async function getStaticProps() {

    const {PrismaClient} = await import("@prisma/client");
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({include: {author: {}}, where: {published: true}});

    return {props: {posts}}
}

type PropsType = Awaited<ReturnType<typeof getStaticProps>>['props'];

const Home: NextPage<PropsType> = (props) => {


    return (
        <div className={""}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="w-6">
                    <CalendarIcon/>
                </h1>

            </main>
        </div>
    )
}


export default Home
