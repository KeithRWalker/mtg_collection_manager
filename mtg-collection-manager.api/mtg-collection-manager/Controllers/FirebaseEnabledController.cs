using System;
using Microsoft.AspNetCore.Mvc;

namespace mtg_collection_manager.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string FirebaseUid => User.FindFirst(x => x.Type == "user_id").Value;
    }
}