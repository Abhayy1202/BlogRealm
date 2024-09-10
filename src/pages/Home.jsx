import React, {useEffect, useRef, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import Typed from 'typed.js';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const el = useRef(null);

    useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ["Blogs", "Stories to Inspire", "Knowledge Hub"],
        startDelay: 300,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });

      return () => {
        typed.destroy();
      };
    }, []);
  
    if (posts.length === 0) {
        return (
          <div className="w-full py-8 mt-4 text-center mb-24">
            <Container>
              <div className="flex flex-col items-center py-8">
                <h1 className="text-4xl md:text-6xl font-bold text-center py-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#5d5650] to-[#537485] dark:from-pink-800 dark:to-violet-700">
                  Welcome to the realm of <span ref={el} />
                </h1>
                <p className="text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#5d5650] to-[#537485]  dark:from-pink-800 dark:to-violet-700 text-center">
                  Explore a world of captivating stories and insightful
                  knowledge.
                </p>
              </div>
            </Container>
          </div>
        );
    }
    return (
        <div className='w-full py-8 h-full'>
            <Container>
                <div className='flex flex-wrap h-full'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 h-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home