'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LogoDivider() {
  return (
    <div className="py-12 bg-white border-b border-gray-light/40">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex justify-center"
        >
          <Image
            src="/logo-full.png"
            alt="Konduti Traders"
            width={100}
            height={100}
            className="w-20 h-20 object-contain"
          />
        </motion.div>
      </div>
    </div>
  )
}
