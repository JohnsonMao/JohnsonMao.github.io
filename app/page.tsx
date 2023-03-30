import Image from "next/image"

function Home() {
  return (
    <main className="px-6 mx-auto">
      <section className="w-full mx-auto">
        <Image
          className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-12"
          src="/images/mao.jpg"
          width={200}
          height={200}
          alt="Johnson Mao"
          priority
        />
      </section>
      <p className="my-12 text-3xl text-center dark:text-white">
        Hello and Welcome &nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Johnson</span>.
        </span>
      </p>
    </main>
  )
}

export default Home