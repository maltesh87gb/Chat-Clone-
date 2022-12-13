export const getMessages = async () => {
    return[
        {
            id : '1',
            body:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
            username:'Harish Kumar',
            userId:'1',
            parentId:null,
            photo:'A',
            createdAt:'2013-09-29T18:46:19Z'

        },
        {
            id : '2',
            body:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
            username:'Praveen Kumar',
            userId:'1',
            photo:'B',
            parentId:null,
            createdAt:'2013-09-29T18:46:19Z'
        },
        {
            id : '3',
            body:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
            username:'Mahesh Kumar',
            userId:'1',
            parentId:'1',
            photo:'C',
            createdAt:'2013-09-29T18:46:19Z'
        },
        {
            id : '4',
            body:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
            username:'Karthik Kumar',
            userId:'1',
            parentId:'2',
            photo:'D',
            createdAt:'2013-09-29T18:46:19Z'
        },
    ];
};

export const CreateMessage = async(text ,parentId=null) =>{
    return{
        id:Math.random().toString(36).substr(2,9),
        body:text,
        parentId,
        photo:'D',
        userId:'1',
        username:'Harish Kumar',
        createdAt:new Date ().toISOString(),

    };
};

export const updateMessage = async(text) => {
    return{text};
};

export const deleteMessage = async() => {
    return {};
};