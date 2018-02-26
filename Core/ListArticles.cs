using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Core
{

    public static class ListArticles
    {
        private static List<Article> list = new List<Article>() { };

        public static int Count()
        {
            int k = 0;
            lock (list) k = list.Count;
            return k;
        }

        public static void AddFile(string file)
        {
            if (File.Exists(file))
            {
                string text = File.ReadAllText(file);
                lock (list)
                {
                    list.Add(new Article(text, file));
                }
            }
        }
         

        public static Article[] Find(Func<Article, bool> condition)
        {
            Article[] a = new Article[] { };
            lock (list)
                a = list.Where(condition).ToArray();
            return a;
        }

        public static Article FindItem(Func<Article, bool> condition)
        {
            Article item = null;
            lock (list)
                item = list.Where(condition).Take(1).SingleOrDefault();
            return item;
        }

        public static void UpdateByKey(string key, Article item)
        {
            lock (list)
            {
                int index = list.FindIndex(x => x.Key == key);
                if (index != -1)
                    list[index] = item;
            }
        }

        public static void RemoveByKey(string key)
        {
            lock (list)
            {
                int index = list.FindIndex(x => x.Key == key);
                if (index != -1)
                    list.RemoveAt(index);
            }
        }

        public static Article[] GetAll()
        {
            Article[] a = new Article[] { };
            lock (list)
                a = list.ToArray();
            return a;
        }
    }
}
