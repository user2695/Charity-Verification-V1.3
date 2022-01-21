
              
                <% qr_code.map(qr => { %>
                  <img src=<%=qr %> alt="QR Code">
                <% }) %> 






















// Creating the data
let data = {
    name:"Employee Name",
    age:27,
    department:"Police",
    id:"aisuoiqu3234738jdhf100223"
  }
  
  // Converting the data into String format
  let stringdata = JSON.stringify(data)
  
  // Print the QR code to terminal
  QRCode.toString(stringdata,{type:'terminal'},
                    function (err, QRcode) {
  
    if(err) return console.log("error occurred")
  
    // Printing the generated code
    console.log(QRcode)
  })
  // Converting the data into base64
  QRCode.toDataURL(stringdata, function (err, code) {
    if(err) return console.log("error occurred")
  
    // Printing the code
    console.log(code)
  })


                          //ANOTHER ONE
                          <!DOCTYPE html>
                          <html lang="en">
                          
                          <head>
                              <meta charset="UTF-8">
                              <meta http-equiv="X-UA-Compatible" content="IE=edge">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>QR Code Generator</title>
                              <!-- Latest compiled and minified CSS -->
                              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                                  integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                              <link rel="stylesheet" href="/style.css" type="text/css">
                          </head>
                          
                          <body>
                              <div class="container">
                                  <h1>QR Code Generator</h1>
                                  <hr>
                                  <form action="/scan" method="POST" class="form">
                                      <textarea name="text" id="text" cols="150" rows="10" placeholder="Enter URL or Text" required></textarea>
                                      <button type="submit" class="btn btn-primary">Generate QR Code</button>
                          
                                  </form>
                          
                              </div>
                          </body>
                          
                          </html>

                          <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>

<body>
    <div class="container">

        <img src=<%=qr_code %> alt="QR Code">
        <br>
        <a href="/" role="button" class="btn btn-primary">Back</a>
    </div>
</body>

</html>

//index.js
app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send("Something went wrong!!");
    res.render("scan", {
      qr_code: src,
    });
  });
});
