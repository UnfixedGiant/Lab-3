"use client"
import axios from 'axios';
import type { Result } from "./person"
import PersonItem from "./personItem"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const url = "https://randomuser.me/api/?results=12"


const PeoplePage = () => {
    const [users, setUsers] = useState<Result[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(url)
            .then((response: any) => {
                console.log(response);
                setUsers(response.data.results);
                setIsLoading(false);
            })
            .catch((error: any) => {
                if (error.isAxiosError) {
                    console.log(error.response);
                    toast.error('Error occured while fetching..');
                } else {
                    console.log(error);
                }
            })
    }, [])
    if (isLoading) {
        return (
            <>
                <span className="loading loading-bars loading-xs"></span>
                <span className="loading loading-bars loading-sm"></span>
                <span className="loading loading-bars loading-md"></span>
                <span className="loading loading-bars loading-lg"></span>
                <span className="loading loading-bars loading-xl"></span>
            </>
        )
    }
    return (
        <section>
            <div className="peopleCards">
                {users?.map((user) => {
                    return (
                        <PersonItem {...user} key={user.login.uuid} remove={() => { }} />
                    )
                })}
            </div>
        </section>
    )

}


export default PeoplePage