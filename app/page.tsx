import { getSession } from "@/lib/auth";

import Footer from "./_components/footer";
import GenerateForm from "@/components/forms/generate-form";
import Header from "./_components/header";

export default async function Home() {
  let session = undefined;
  try {
    session = await getSession();
  } catch (error) {}

  return (
    <div className="overflow-clip flex flex-col min-h-screen relative tracking-tight bg-muted/10">
      <div className="absolute w-full h-full top-0 z-[3] bg-[url('/square.svg')] invert dark:invert-0 bg-cover"></div>

      {/* bg color */}
      <div className="absolute w-full h-full top-0 left-0 backdrop-blur-3xl bg-gradient-to-r from-background to-background/40 z-0"></div>

      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-60">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-purple-600 dark:from-purple-600/80 to-purple-400 dark:to-purple-400/20 animate-swing"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300  animate-swing"></div>
      </div>

      {/* Site header */}
      <Header />
      {/* Page content */}
      <main className="grow flex flex-col relative z-50">
        {/* pt-28 pb-12 */}
        <section className="flex grow flex-col justify-evenly">
          <div className="px-4 md:px-6">
            <div className="max-w-[48rem] mx-auto mb-12">
              <div className="text-center">
                <h1 className="pb-4 text-5xl md:text-7xl leading-[3rem]  font-bold">
                  Effortless, seamless link shortening.
                </h1>
                <p className="text-lg leading-6 max-w-[700px] mx-auto">
                  Quickly convert lengthy URLs into concise, shareable links.
                  Manage your online presence effortlessly while monitoring link
                  performance seamlessly.
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-6">
            <div className="flex items-center justify-center gap-10 mb-10 relative max-w-[850px] mx-10 md:mx-auto">
              <div className="mx-auto shrink-0 w-full max-w-[30rem]">
                <div className="relative">
                  <div className="absolute inset-[-1.5rem] z-[-10] rounded bg-gradient-to-r from-purple-200 to-sky-200  dark:from-purple-600/20 dark:to-sky-600/30 min-h-[8rem]" />
                  {/* form here */}
                  <GenerateForm session={session} />
                </div>
              </div>
            </div>
            <div className="max-w-[48rem] mx-auto">
              <p className="text-center text-sm leading-5 text-gray-500">
                Join <span className="cj90m cgrfs cxpc2">2.000+</span> users who
                have simplified their online presence.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
