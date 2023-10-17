import moment from "moment";

export const getFormattedDate = (createdAt: string) => {
    const timeDifferenceHours = moment().diff(createdAt, "hours");

    if (timeDifferenceHours < 1) {
        return moment(createdAt).fromNow(); // Less than 1 hour
    } else if (timeDifferenceHours < 24) {
        return moment(createdAt).format("LT"); // Less than 24 hours
    } else if (timeDifferenceHours < 168) {
        return moment(createdAt).format("dddd, LT"); // Less than 7 days
    } else {
        return moment(createdAt).format("MMMM Do, YYYY"); // More than 7 days
    }
};



export const extractPTags = (htmlCode: string): string[] => {
    const pTagArray: string[] = [];

    // Remove HTML tags
    const withoutTags = htmlCode.replace(/<\/?[^>]+(>|$)/g, "");

    // Extract content of <p> tags into an array
    const pTagsRegex = /<p[^>]*>(.*?)<\/p>/g;
    const pTags = withoutTags.match(pTagsRegex);

    if (pTags) {
        pTags.forEach((pTag: string) => { // Fix 1: Add type annotation to pTag
            const pContent = pTag.replace(/<\/?[^>]+(>|$)/g, "");
            pTagArray.push(pContent);
        });
    }

    return pTagArray;
};

export const removePTags = (content: string): string[] => {
    const matches: string[] = [];
    content.replace(/<p>(.*?)<\/p>/g, function (_match, group) {
        matches.push(group);
        return `<p>${group}</p>`;
    });
    return matches;
};

export const extractPTagContents = (htmlText: string) => {
    const extractedContents = [];
    const regex = /<p>(.*?)<\/p>/g;
    let match;

    while ((match = regex.exec(htmlText)) !== null) {
        const pTagContent = match[1].replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags from the content
        extractedContents.push(pTagContent);
    }

    return extractedContents;
};
