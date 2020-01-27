using Microsoft.AspNetCore.Mvc;

namespace mtg_collection_manager.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string FirebaseUserId => User.FindFirst(x => x.Type == "user_id").Value;
    }
}