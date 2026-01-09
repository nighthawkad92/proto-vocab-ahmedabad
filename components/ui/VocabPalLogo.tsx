import Image from 'next/image'

export const VocabPalLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Image
        src="/logo-vocabpal.png"
        alt="VocabPal Logo"
        width={200}
        height={200}
        priority
        className="object-contain"
      />
    </div>
  )
}
