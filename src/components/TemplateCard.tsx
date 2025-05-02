import { motion } from 'framer-motion'

export default function TemplateCard({
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
}) {
  return (
    <motion.div
      className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-48"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="p-5">
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
        <motion.button
          className="mt-4 px-5 py-2 bg-accent text-white font-semibold rounded-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Choose Template
        </motion.button>
      </div>
    </motion.div>
  )
}
