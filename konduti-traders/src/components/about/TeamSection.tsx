'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TeamMember {
  name: string
  role: string
  bio: string
  image?: string
}

interface TeamSectionProps {
  team: TeamMember[]
}

export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="team-heading">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="eyebrow text-green block mb-4">Our Team</span>
          <h2
            id="team-heading"
            className="font-display font-light text-dark"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            The people behind the supply.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-80px' }}
              className="bg-gray-light rounded-xl p-6 border border-gray-light/40"
            >
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={420}
                  height={420}
                  className="w-full h-64 object-cover rounded-lg mb-5"
                />
              )}
              <h3 className="font-display font-semibold text-dark text-2xl mb-1">{member.name}</h3>
              <p className="font-body text-green text-base font-medium mb-3">{member.role}</p>
              <p className="font-body text-gray-text text-base leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
