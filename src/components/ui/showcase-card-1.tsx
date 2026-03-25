'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export const ShowcaseCard = ({ projectTitle, projectSubtitle, imageUrl, description }: any) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className='flex items-center justify-center'>
            <motion.div 
                className='h-[500px] w-[350px] bg-black/80 backdrop-blur-sm rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col p-4 gap-4 overflow-hidden border border-gray-800'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ 
                    scale: 1.01,
                    boxShadow: "0 35px 60px -15px rgba(0,0,0,0.7)",
                    borderColor: "rgba(255,255,255,0.2)"
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className='flex justify-between items-center'>
                    <motion.svg 
                        width="34px" 
                        height="34px" 
                        fill="white" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <path fill="currentColor" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v4h14V5H5zm0 6v8h4v-8H5zm6 0v8h8v-8h-8z"/>
                    </motion.svg>
                    <motion.div 
                        className='w-10 h-10 bg-chartreuse/20 rounded-full flex items-center justify-center cursor-pointer border border-chartreuse/50'
                        whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: "#C9FF1F",
                            boxShadow: "0 0 15px rgba(201, 255, 31, 0.7)" 
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-black">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </motion.div>
                </div>
                <div className='flex flex-col gap-4 flex-1'>
                    <motion.div 
                        className="title text-3xl text-center font-bold text-white tracking-widest uppercase font-heading"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        {projectTitle}
                        <br />
                        <span className="text-chartreuse text-xl">{projectSubtitle}</span>
                    </motion.div>
                    <motion.div 
                        className="image relative h-[200px] mt-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <div className="absolute inset-0 rounded-2xl opacity-15 z-0 overflow-hidden">
                            <motion.div
                                animate={{ scale: isHovered ? 1.03 : 1 }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                                className="w-full h-full"
                            >
                                <img
                                    src={imageUrl} 
                                    alt={projectTitle} 
                                    className="w-full h-full object-cover blur-sm scale-150 opacity-70"
                                />
                            </motion.div>
                        </div>
                        <motion.div 
                            className="relative z-10 w-full h-full"
                            whileHover={{ scale: 1.03 }}
                            transition={{ ease: "easeInOut" }}
                        >
                            <img
                                src={imageUrl} 
                                alt={projectTitle} 
                                className="rounded-xl w-full h-full object-cover shadow-lg border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        className="desc text-sm text-center max-w-72 mx-auto text-neutral-400 font-light mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                    >
                        {description}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
