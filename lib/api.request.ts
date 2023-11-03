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
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};


export const fetchLatestPosts = async (): Promise<Post[]> => {
    try {
        // Make an API request to fetch latest posts with _embed
        const response: AxiosResponse<Post[]> = await axios.get(
            'https://clcgh.org/wp-json/wp/v2/posts?_embed'
        );

        // Extract the posts data from the response
        const posts: Post[] = response.data;

        return posts;
    } catch (error) {
        console.error('Error fetching latest posts:', error);
        throw error;
    }
};


export const getPostIdFromSlug = async (slug: string) => {
    try {
        const response = await fetch(`https://yourwordpresssite.com/wp-json/wp/v2/posts?slug=${slug}`);

        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }

        const postData = await response.json();

        if (postData.length > 0) {
            const postId = postData[0].id;
            return postId;
        } else {
            throw new Error('Post not found');
        }
    } catch (error) {

        console.error(error);
        throw new Error('Failed to fetch post data');

        // Handle error appropriately
    }
};


export const addCommentToPost = async (postId: string, commentData: any
) => {
    try {
        const response = await axios.post('https://yourwordpresssite.com/wp-json/wp/v2/comments', {
            post: postId,
            content: commentData.content,
            author_email: commentData.author_email,
            author_name: commentData.author_name,
        }, {
            headers: {
                'Content-Type': 'application/json',
                // Include any additional headers if needed, such as authentication headers
            },
        });

        console.log('Comment added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        // Handle the error appropriately
    }
};
