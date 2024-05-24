import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex flex-col min-h-[200px] items-center justify-between p-24">
      <div className='col-auto'>
        <h1 className="text-4xl font-bold">Welcome to Recipients page!</h1>
      </div>

      <div className="flex items-center space-y-8">
          <div className='col-end-6'>
              <div className="image-wrapper">
                  <Image
                      src="/recipients.jpg"
                      alt="Next.js logo"
                      width={200}
                      height={200}
                  />
              </div>
          </div>
          <div className='col-end-6'>
                <p>Here you can view all the recipients of the donations.</p>
          </div>

      </div>
    </main>
  );
}
