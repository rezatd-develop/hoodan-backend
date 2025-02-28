const Slider = require('../../../models/Slider');

exports.getSlider = async (req, res) => {
  const sliderId = parseInt(req.params.id, 10);
  if (isNaN(sliderId)) {
    return res.status(400).json({
      hasError: true,
      data: null,
      message: 'Invalid slider id'
    });
  }

  try {
    const slider = await Slider.findOne({ sliderId });
    if (!slider) {
      return res.status(404).json({
        hasError: true,
        data: null,
        message: 'Slider not found'
      });
    }
    return res.json({
      hasError: false,
      data: slider,
      message: 'Slider retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving slider'
    });
  }
};

exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    return res.json({
      hasError: false,
      data: sliders,
      message: 'Sliders retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      data: null,
      message: 'Error retrieving sliders'
    });
  }
};
