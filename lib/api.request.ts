import axios, { AxiosResponse } from "axios";
const BASE_URL = "https://clcgh.org/wp-json/wp/v2/";
interface Post {
    // Define the structure of a post
    id: number;
    title: {
        rendered: string;
    };
    // Add more fields as needed
}



export const fetchPosts = async (page: number = 1, perPage: number = 20): Promise<Post[]> => {
    try {
        const response: AxiosResponse<Post[]> = await axios.get(BASE_URL + "posts", {
            params: {
                page,
                per_page: perPage,
            },
        });

        if (response.status !== 200) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching posts: ${error as Error}`);
    }
};

export const fetchPost = async (postId: string): Promise<Post> => {
    try {
        const response: AxiosResponse<Post> = await axios.get(`${BASE_URL + "posts"}/${postId}`);

        if (response.status !== 200) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching post: ${error as Error}`);
    }
};



export const fetchComments = async (postID: string) => {
    try {

        const response = await axios.get(
            `https://clcgh.org/wp-json/wp/v2/comments?post=${postID}`
        );
        console.log(`${BASE_URL}comments?post=${postID}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};