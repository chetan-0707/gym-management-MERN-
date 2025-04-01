const Membership = require('../Modals/membership');


exports.addMembership = async(req, res) => {
    try {
        const { months, price } = req.body;
        const memberShip = await Membership.findOne({
            gym: req.gym._id,
            months
        });

        if (memberShip) {
            memberShip.price = price;
            await memberShip.save();
            res.status(200).json({ message: "Update Successfully" })
        } else {
            const newMembership = new Membership({
                price,
                months,
                gym: req.gym._id
            });
            await newMembership.save();
            res.status(200).json({
                message: "Added Successfully",
                data:newMembership
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "server Error "
        })
    }
}


exports.getMembership = async(req, res) => {
    try {
        const loggedId = req.gym._id;
        const membership = await Membership.find({
            gym: loggedId
        });
        res.status(200).json({ message: "Membership Fetched Successfully", membership: membership })

    } catch (error) {
        res.status(500).json({
            error: "server Error "
        })
    }
}