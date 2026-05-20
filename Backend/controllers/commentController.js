import commentModel from "../models/foodComments.js";
import sentiModel from "../models/sentimentModel.js"

const addComment = async (req, res) => {
  const { foodId, food, newComment } = req.body;
  const comment = new commentModel({
    foodId: foodId,
    food: food,
    newComment: newComment,
  });

  console.log("Comment Request Body", req.body);
  try {
    await comment.save();
    res.json({ success: true, message: "Comment Added Successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Error" });
  }
};

const sentiment = async(req,res)=>{


    try {

        let sentiments = await sentiModel.find({});
        
        res.json({ success: true, data: sentiments });
        
    } catch (error) {

        console.error("Error fetching sentiment", error);
        res.status(500).json({ success: false, message: error.message || "Error fetching sentiment" });
        
    }

}

export {sentiment,addComment};
