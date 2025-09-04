"use client"

import { Card } from "@/components/ui/card"
import { Heart, Star, Sparkles, X } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function HomePage() {
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0 })
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [videoThumbnails, setVideoThumbnails] = useState<{ [key: number]: string }>({})
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  useEffect(() => {
    const updateCounter = () => {
      const startDate = new Date("2025-04-13T00:00:00")
      const now = new Date()
      const diffTime = now.getTime() - startDate.getTime()

      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))

      setTimeElapsed({ days, hours, minutes })
    }

    updateCounter()
    const interval = setInterval(updateCounter, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const generateVideoThumbnail = (videoElement: HTMLVideoElement, videoId: number) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight

    // Seek to 1 second to get a better frame
    videoElement.currentTime = 1

    videoElement.addEventListener(
      "seeked",
      () => {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        const thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.8)

        setVideoThumbnails((prev) => ({
          ...prev,
          [videoId]: thumbnailDataUrl,
        }))
      },
      { once: true },
    )
  }

  const handleVideoLoaded = (videoElement: HTMLVideoElement, videoId: number) => {
    if (videoElement && videoElement.readyState >= 1) {
      generateVideoThumbnail(videoElement, videoId)
    }
  }

  const openPhotoModal = (photoSrc: string) => {
    setSelectedPhoto(photoSrc)
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
  }

  const mediaItems = [
    {
      id: 1,
      title: "Meu posicionamento",
      thumbnail: "/one.jpg",
      type: "photo",
      message: "Abandonei toda essa ideia de guardar rancor e não seguir em frente, larguei meu orgulho e fui me resolver com meu pai. Justamente pra ter uma visão de como as coisas podem melhorar e mudar e me ofereci de bom grado pra muita coisa, inclusive começar uma faculdade. Eu quero construir um futuro sim. e um futuro inclusive com você, foi por amor a minha decisão, mas eu sempre me imaginei construindo algo. só não sabia como faria, mas meus olhos se abriram.",
    },
    {
      id: 2,
      title: "Primeiro post",
      thumbnail: "/two.jpg",
      type: "photo",
      message: "A primeira coisa que você postou sobre a gente. Além de aqui eu estar absurdamente apaixonado por você e o que poderiamos construir, foi onde eu realmente vi que você era a mulher pra minha vida, não tinha se passado nem o primeiro eu te amo. mas eu ja tinha certeza!",
    },
    {
      id: 3,
      title: "A primeira vez",
      thumbnail: "/three.jpg",
      type: "photo",
      message: "Isso aqui absurdamente mexe comigo todos os dias, a primeira vez que fui te ver e a gente nem imaginava a proporção que tudo tomaria. Vim com um pensamento voltei com outro, além de ser completamente acolhido por você e sua família.. realmente aqui eu me choquei totalmente, e percebi o quanto queria casar com vc.",
    },
    {
      id: 4,
      title: "A primeira call",
      src: "/one.mp4",
      type: "video",
      message: "Nessa epoca seu braço tava quebrado e você não podia fazer muita coisa, me ofereci a telar pra ti em call no discord e daqui foi só pra frente o que aparentemente era possivel construir com você, eu me senti muito feliz e especial, cada bala, cada reação e o jeito que você me tratava, sei la parecia único sabe.",
    },
    {
      id: 5,
      title: "Continuação",
      src: "/two.mp4",
      type: "video",
      message: "Você ainda com o braço quebrado estava tentando fazer mais e mais parte do meu dia, me acompanhar mais em minhas coisas e continuar seguindo com as suas e nessa época aqui eu ainda me importava comigo mesmo, por que eu tinha que estar bem pra te ver bem. foi uma essencia que eu fui perdendo com o tempo e eu acabei falhando como pessoa, mas isso nunca deixou de ser especial, justamente por isso guardei todas essas coisas até o dia de hoje, eu sabia que me serviriam um dia, talvez pra fazer uma homenagem ou pra te demonstrar o quanto me importei. tanto em guardar quanto em me expressar ou te demonstrar o quanto vc foi e é especial pra mim meu amor.",
    },
    {
      id: 6,
      title: "Nervosismo",
      src: "/three.mp4",
      type: "video",
      message: "Eu estava vindo te ver, eu passei essa noite em claro acordado contando cada minuto especifico só pra ver o seu rostinho e estar ali com você, sabia que passariamos por muitas coisas e eu sabia que era muito dificil sua convivencia. não esperava que tudo se tornasse isso mas ja era um grande passo por nós, contando cada segundinho e olhando pra janela imaginando um grande futuro com você.",
    },
  ]

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundImage: "url('/my-melody-kuromi-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-pink-100/85 to-rose-100/85 backdrop-blur-sm">
        {/* Header with kawaii elements */}
        <header className="relative py-6 md:py-8 px-4 text-center">
          <div className="absolute top-4 left-2 md:left-4 kawaii-float">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-500 fill-pink-500" />
          </div>
          <div className="absolute top-4 right-2 md:right-4 kawaii-float" style={{ animationDelay: "1s" }}>
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-400 fill-pink-400" />
          </div>
          <div className="absolute top-12 left-1/4 kawaii-float" style={{ animationDelay: "2s" }}>
            <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-600 fill-pink-600" />
          </div>
          <div className="absolute top-12 right-1/4 kawaii-float" style={{ animationDelay: "0.5s" }}>
            <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-300 fill-pink-300" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-pink-600 mb-4 kawaii-pulse">⭐ Memories ⭐</h1>
          <div className="flex justify-center gap-2 mb-4 md:mb-6">
            <span className="text-xl md:text-2xl">🌸</span>
            <span className="text-xl md:text-2xl">⭐</span>
            <span className="text-xl md:text-2xl">🌸</span>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-4 md:py-8">
          {/* Emotional message section */}
          <Card className="max-w-4xl mx-auto p-4 md:p-8 mb-8 md:mb-12 bg-gradient-to-br from-pink-100/95 to-rose-100/95 backdrop-blur-sm border-2 border-pink-300/60 shadow-lg">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2 md:gap-4 mb-4 md:mb-6">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-pink-400 fill-pink-400 kawaii-pulse" />
                <Star
                  className="w-6 h-6 md:w-8 md:h-8 text-pink-500 fill-pink-500 kawaii-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <Star
                  className="w-6 h-6 md:w-8 md:h-8 text-pink-400 fill-pink-400 kawaii-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 font-medium text-balance px-2">
                A nossa história, algo que a gente não pode esquecer, mas pode mudar e ser melhor. Aqui estão
                algumas coisas que dizem e provam que foi amor verdadeiro. E apesar de eu deixar a desejar, EU me
                arrependo muito. Fiz com carinho, espero que veja e leia tudo.
              </p>

              <div className="flex justify-center gap-2 md:gap-4 mt-4 md:mt-6">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-pink-500 fill-pink-500 kawaii-float" />
                <Star
                  className="w-5 h-5 md:w-6 md:h-6 text-pink-400 fill-pink-400 kawaii-float"
                  style={{ animationDelay: "1s" }}
                />
                <Sparkles
                  className="w-5 h-5 md:w-6 md:h-6 text-pink-500 fill-pink-500 kawaii-float"
                  style={{ animationDelay: "2s" }}
                />
              </div>
            </div>
          </Card>

          {/* Media gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {mediaItems.map((item, index) => (
              <Card
                key={item.id}
                className="group overflow-hidden bg-gradient-to-br from-pink-100/95 to-rose-100/95 backdrop-blur-sm border-2 border-pink-300/60 hover:border-pink-500/80 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {item.type === "photo" ? (
                  <>
                    <div
                      className="relative cursor-pointer"
                      onClick={() => openPhotoModal(item.thumbnail || "/placeholder.svg")}
                    >
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                    <div className="p-3 md:p-4 text-center">
                      <h3 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">{item.title}</h3>
                      <div className="flex justify-center gap-2">
                        <span className="text-sm">💕</span>
                        <span className="text-xs md:text-sm text-gray-600">{item.message}</span>
                        <span className="text-sm">💕</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <div className="w-full h-40 md:h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <video
                          ref={(el) => {
                            videoRefs.current[item.id] = el
                          }}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                          poster={videoThumbnails[item.id] || "/video-thumbnail.png"}
                          playsInline
                          muted={false}
                          onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement
                            handleVideoLoaded(video, item.id)
                          }}
                          style={{
                            backgroundColor: "#000",
                            objectFit: "contain",
                          }}
                        >
                          <source src={item.src} type="video/mp4" />
                          <span style={{ color: "#ffffff" }}>Seu navegador não suporta vídeos HTML5.</span>
                        </video>
                      </div>
                    </div>
                    <div className="p-3 md:p-4 text-center">
                      <h3 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">{item.title}</h3>
                      <div className="flex justify-center gap-2">
                        <span className="text-sm">💕</span>
                        <span className="text-xs md:text-sm text-gray-600">{item.message}</span>
                        <span className="text-sm">💕</span>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>

          {/* Contador do Amor */}
          <Card className="max-w-2xl mx-auto mt-12 md:mt-16 p-4 md:p-8 bg-gradient-to-br from-pink-100/95 to-rose-100/95 backdrop-blur-sm border-2 border-pink-400/60 shadow-xl">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2 md:gap-4 mb-4">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-600 fill-pink-600 kawaii-pulse" />
                <Star
                  className="w-6 h-6 md:w-8 md:h-8 text-pink-400 fill-pink-400 kawaii-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <Heart
                  className="w-6 h-6 md:w-8 md:h-8 text-pink-600 fill-pink-600 kawaii-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-600 mb-4 md:mb-6">
                💕 Contador do Amor 💕
              </h2>

              <div className="bg-white/90 rounded-2xl p-4 md:p-6 border-2 border-pink-300/60 shadow-inner">
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600">{timeElapsed.days}</div>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 font-medium">dias</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600">{timeElapsed.hours}</div>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 font-medium">horas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600">
                      {timeElapsed.minutes}
                    </div>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 font-medium">minutos</p>
                  </div>
                </div>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 font-medium">que eu te amo</p>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Desde 13 de abril de 2025 ⭐</p>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                <span className="text-lg md:text-xl">🌸</span>
                <span className="text-lg md:text-xl">💖</span>
                <span className="text-lg md:text-xl">🌸</span>
              </div>
            </div>
          </Card>

          {/* Footer message */}
          <div className="text-center mt-12 md:mt-16 mb-8">
            <div className="flex justify-center gap-2 md:gap-4 mb-4">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-600 fill-pink-600 kawaii-pulse" />
              <Star
                className="w-5 h-5 md:w-6 md:h-6 text-pink-400 fill-pink-400 kawaii-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <Heart
                className="w-5 h-5 md:w-6 md:h-6 text-pink-600 fill-pink-600 kawaii-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <p className="text-gray-600 text-xs md:text-sm">🌸 Cada memória é uma lembrança especial 🌸</p>
          </div>
        </main>

        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePhotoModal}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closePhotoModal}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedPhoto || "/placeholder.svg"}
                alt="Foto ampliada"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
