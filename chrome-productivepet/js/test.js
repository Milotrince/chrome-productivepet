(function() {

    let notification = $('<div id="productivepet-notification"></div>')
    notification.css({
        'position':'fixed'
    })
    $(document).append(notification)

})()

// //   <style>
// //         #notification {
// //             position:fixed;
// //             top:40px; /* Set to 0 or wherever */
// //             width:95%; /* set to 100% if space is available */
// //             z-index:105;
// //             text-align:center;
// //             font-weight:normal;
// //             font-size:14px;
// //             font-weight:bold;
// //             color:white;
// //             background-color:#FF7800;
// //             padding:5px;
// //         }
// //         #notification span.dismiss {
// //             border:2px solid #FFF;
// //             padding:0 5px;
// //             cursor:pointer;
// //             float:right;
// //             margin-right:10px;
// //         }
// //         #notification a {
// //             color:white;
// //             text-decoration:none;
// //             font-weight:bold
// //         }
// //     </style>

// $("#notification").fadeIn("slow").append('your message');
// $(".dismiss").click(function(){
//     $("#notification").fadeOut("slow");
// });