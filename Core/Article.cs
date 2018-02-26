using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;

namespace Core
{

    public class Article
    {
        public string Key { set; get; }
        public string Theme { set; get; }
        public string Tag { set; get; }
        public string Title { set; get; }
        public string Content { set; get; }
        public long DateCreate { set; get; }

        public Article() { }
        public Article(string text)
        {
            if (!string.IsNullOrEmpty(text))
            {
                string[] a = text.Split(new string[] { Environment.NewLine }, StringSplitOptions.None)
                        .Select(x => x.Trim())
                        .Where(x => x != "")
                        .ToArray();
                long date = 0;
                long.TryParse(a[0], out date);
                DateCreate = date;
                if (a.Length > 3)
                {
                    Theme = a[1];
                    Tag = a[2];
                    Title = a[3];
                    Key = ToAscii(Title);
                    a = a.Where((x, k) => k > 3).ToArray();
                    Content = string.Join(Environment.NewLine + Environment.NewLine, a);
                }
            }
        }

        public Article(string text, string file) : this(text)
        {
            if (!string.IsNullOrEmpty(Title))
            {
                string finame = Path.GetFileName(file);
                if (finame != Key + ".htm")
                {
                    string path = Path.GetDirectoryName(file) + "\\" + Key + ".htm";
                    System.IO.File.Move(file, path);
                }
            }
        }

        public bool UpdateFile(string path)
        {
            try
            {
                StringBuilder bi = new StringBuilder();
                bi.Append(DateCreate);
                bi.Append(Environment.NewLine);
                bi.Append(Theme);
                bi.Append(Environment.NewLine);
                bi.Append(Tag);
                bi.Append(Environment.NewLine);
                bi.Append(Title);
                bi.Append(Environment.NewLine);
                bi.Append(Content);

                string keyNew = ToAscii(Title), keyOld = Key;
                string file = Path.Combine(path, keyNew + ".htm");
                File.WriteAllText(file, bi.ToString());

                if (keyNew != keyOld)
                {
                    file = Path.Combine(path, keyOld + ".htm");
                    new Thread(() =>
                    {
                        if (File.Exists(file))
                            File.Delete(file);
                    }).Start();
                }

                ListArticles.UpdateByKey(keyOld, this);
                ListArticles.UpdateByKey(keyNew, this);

                return true;
            }
            catch { }

            return false;
        }

        /// <summary>
        /// Chuyển chuỗi unicode sang ascii (lọc bỏ dấu tiếng việt) 
        /// </summary>
        /// <param name="unicode"></param>
        /// <returns></returns>
        private String ToAscii(string unicode)
        {
            if (string.IsNullOrEmpty(unicode)) return "";

            unicode = Regex.Replace(unicode.Trim(), "[áàảãạăắằẳẵặâấầẩẫậ]", "a");
            unicode = Regex.Replace(unicode.Trim(), "[óòỏõọôồốổỗộơớờởỡợ]", "o");
            unicode = Regex.Replace(unicode.Trim(), "[éèẻẽẹêếềểễệ]", "e");
            unicode = Regex.Replace(unicode.Trim(), "[íìỉĩị]", "i");
            unicode = Regex.Replace(unicode.Trim(), "[úùủũụưứừửữự]", "u");
            unicode = Regex.Replace(unicode.Trim(), "[ýỳỷỹỵ]", "y");
            unicode = unicode.Trim().Replace("đ", "d").Replace("đ", "d");
            unicode = Regex.Replace(unicode.Trim(), "[-\\s+/]+", "-");
            unicode = Regex.Replace(unicode.Trim(), "\\W+", "-"); //Nếu bạn muốn thay dấu khoảng trắng thành dấu "_" hoặc dấu cách " " thì thay kí tự bạn muốn vào đấu "-"
            return unicode.ToLower().Trim();
        }
    }
}
