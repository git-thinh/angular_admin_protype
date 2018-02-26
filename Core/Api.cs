using System;
using System.IO;
using System.Web;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace Core
{
    public class Api : IHttpHandler
    {
        static string pathDir = "";
        private void load()
        {
            if (ListArticles.Count() == 0)
            {
                string[] fs = Directory.GetFiles(pathDir, "*.htm");
                if (fs.Length != ListArticles.Count())
                    foreach (var fi in fs) ListArticles.AddFile(fi);
            }
        }

        public void ProcessRequest(HttpContext context)
        {
            object co = context.Request.Cookies["socket-id"];

            if (pathDir == "")
                pathDir = context.Server.MapPath("~/Articles/");
            load();

            string url = context.Request.Url.ToString();

            string mod = "", key ="", json = "";
            string method = context.Request.HttpMethod;
            switch (method)
            {
                case "GET":
                    #region [=== ===]
                    mod = context.Request.QueryString["mod"];
                    if (!string.IsNullOrEmpty(mod))
                    {
                        switch (mod)
                        {
                            case "article":
                                key = context.Request.QueryString["key"];
                                Article item = ListArticles.FindItem(x => x.Key.Equals(key));
                                json = "{}";
                                if (item != null)
                                    json = JsonConvert.SerializeObject(item);

                                context.Response.Clear();
                                context.Response.ContentType = "text/json";
                                context.Response.Write(json);
                                context.Response.Flush();
                                break;
                            case "search":
                                string keyword = context.Request.QueryString["key"];
                                Article[] search = ListArticles.Find(x => x.Content.ToLower().Contains(keyword));
                                json = "{}";
                                if (search != null)
                                    json = JsonConvert.SerializeObject(search);

                                context.Response.Clear();
                                context.Response.ContentType = "text/json";
                                context.Response.Write(json);
                                context.Response.Flush();
                                break;
                            case "articles":
                                json = "[]";

                                json = JsonConvert.SerializeObject(ListArticles.GetAll());

                                context.Response.Clear();
                                context.Response.ContentType = "text/json";
                                context.Response.Write(json);
                                context.Response.Flush();
                                break;
                            default:
                                string path = context.Server.MapPath("~/Modules/" + mod + "/data.json");
                                if (File.Exists(path))
                                {
                                    json = File.ReadAllText(path);
                                    context.Response.Clear();
                                    context.Response.ContentType = "text/json";
                                    context.Response.Write(json);
                                    context.Response.Flush();
                                }
                                break;
                        }
                    }
                    else
                    {
                        context.Response.Clear();
                        context.Response.ContentType = "text/plain";
                        context.Response.Write("URL FORMART: http://localhost/json.aspx?mod=MODULE_ID");
                        context.Response.Flush();
                        //context.Response.Close();
                    }
                    #endregion 
                    break;
                case "POST":
                    #region [=== POST ===]

                    mod = context.Request.QueryString["mod"];
                    key = context.Request.QueryString["key"];
                    string    title = "", content = "",
                        ok = "";
                    if (!string.IsNullOrEmpty(mod))
                    {
                        Article item = ListArticles.FindItem(x => x.Key == key);
                        if (item != null)
                        {
                            switch (mod)
                            {
                                case "title":
                                    using (StreamReader stream = new StreamReader(context.Request.InputStream))
                                    {
                                        title = stream.ReadToEnd();
                                        title = HttpUtility.UrlDecode(title);
                                    }

                                    if (!string.IsNullOrEmpty(title))
                                    {
                                        item.Title = title;
                                        ok = item.UpdateFile(pathDir) ? "OK" : "";
                                    }
                                    break;
                                case "content":
                                    using (StreamReader stream = new StreamReader(context.Request.InputStream))
                                    {
                                        content = stream.ReadToEnd();
                                        content = HttpUtility.UrlDecode(content);
                                    }
                                    item.Content = content;
                                    ok = item.UpdateFile(pathDir) ? "OK" : "";
                                    break;
                                case "image":
                                    break;
                            }
                        }
                    }

                    context.Response.Clear();
                    context.Response.ContentType = "text/palin";
                    context.Response.Write(ok);
                    context.Response.Flush();

                    #endregion

                    break;
            }

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }


}
