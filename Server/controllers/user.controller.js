const User = require ('../models/user.model');

module.exports.getDetails = async (req, res) => {
  try {
    const user = await User.findById (req.payload._id).populate ({
      path: 'associate_requests',
      populate: {
        path: 'article',
        populate: {
          path: 'author',
        },
      },
    });
    if (!user) {
      return res.status (404).send ('User not found');
    }
    res.status (200).json ({success: true, user: user});
  } catch (error) {
    res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
      error: err,
    });
  }
};

module.exports.postDetails = async (req, res) => {
  try {
    const user = await User.findById (req.payload._id);
    if (!user) {
      return res.status (404).json ({
        success: false,
        message: 'User not found',
      });
    }

    // expecting an array of strings
    const {domain} = req.body;

    // TODO -> add validations for domain (FETCHING FROM API);
    if (domain.length === 0) {
      return res.status (400).json ({
        success: false,
        message: 'Domain cannot be empty',
      });
    }

    user.domain = domain;
    await user.save ();

    res.status (200).json ({
      success: true,
      message: 'Domain updated successfully',
      user,
    });
  } catch (err) {
    res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
      error: err,
    });
  }
};
