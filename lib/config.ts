const config = {
    general : {
      title : "RoboTech",
      description : "Sample MDwiki description",
      url : "localhost",
      port : 8000,
      expireTime : 0,
      defaultSearchReslut : 20,
      icon : "/public/media/logo.jpg",
      url_type : "id"  // [id, title]
    },

    backend:{
        salt:10,
    },
    
    database : {
        host: "localhost:9200",
        // port : null,
        // dbname: "mdwiki",
        // user: "test_user",
        // password: "test_password",
        // engine : "InnoDB"
    },
    
    user : {
        AllowViewWithoutLogin :   true,
        AllowEditWithoutLogin :   false,
        AllowDeleteWithoutLogin : false,
        UseTwoStepVerification : false,
        EnableAuthentication   : false,
        MaxUserNumber : 10000,
    },
    
    pages : {
        mainPage : encodeURI("/list"),
        // mainPage : encodeURI("メインページ"),
        render_goto_top : true,
        render_lgtm_btn:true,
    },

    dirs : {
        mediaFileDir : "./public/media",
        logoImg : "",
        acceptUploadFileExtention : [
            "jpg", "png", "mpeg", "tiff", "tif", "bmp", "eps", "raw", "svg",
            "txt", "md", 
            "mp4", 
            "mp3", "wav", "ogg",
            ".sldprt", 
            "html", "css", "js", "json", "c", "c++", "py", ".gitignore", "rb", "xml", ".env"
        ]
    },

    slack : {
        pages : [ // 記録するページ

        ],

        monitor : [ // 変更が合った時にメッセージを送信するページ


        ],
    }
}

export default config;
