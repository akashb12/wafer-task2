const config = require("../config/key");
const { Pdf } = require("../model/Pdf");
const shortId = require('shortid')

//get pdf data
module.exports.getPdfData = function (req, res) {
    Pdf.findOne({ writer: req.body.id })
        .exec((err, pdf) => {
            if (err) return res.status(400).json({ status: false, err });
            if (pdf) {
                res
                    .status(200)
                    .json({ status: true, pdf });
            }
            else {
                res
                    .status(400)
                    .json({ status: false });
            }
        });
};


// add form data
module.exports.addData = function (req, res) {
    const { address, pincode, age,id } = req.body;
    Pdf.findOneAndUpdate(
        { writer: id},
        {  address: address,pincode:pincode,age:age  },
        { new: true },
        (err, pdf) => {
            if (err) return res.status(400).json({ status: false, err });
            else if(pdf){
                return res.status(200).json({
                    status: true,
                    message: "data added"
                });
            }
            else{
                const pdf = new Pdf({ writer:id,address: address,pincode:pincode,age:age });
                pdf.save((err, doc) => {
                    if (err) {
                        console.log("error", err)
                        return res.json({ status: false, err });
                    }
                    else {
                        return res.status(200).json({
                            status: true,
                            pdf: doc
                        });
                    }
                });
            }
        })
};