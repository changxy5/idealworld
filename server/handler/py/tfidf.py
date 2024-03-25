# 使用sklearn库的TfidfTransformer类实现基于tf-idf + simcos 的查询算法

# input：1、已做分词的Di集合数组（二元数组，空格作为分隔符）：[[aa bbb cc],[aaa bbbb cc],[a bb c]...](顺序=id)
## 2、已做分词的Q数组：[aa bbb cc]

# output：最大相似度文本的id集合

from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer

# 使用sklearn库的cosine_similarity类实现余弦相似度计算
from sklearn.metrics.pairwise import cosine_similarity

# 辅助包，list转为array
import numpy as np

# 计算文本的tfidf权重并标准化
def Tfidf(cps):
  corpus = cps
  
  vectorizer = CountVectorizer(
    stop_words=None, # 不使用停用词
    token_pattern=r"(?u)\S+" # 使用正则表达式分词，计算单个字符
    )
  # 标准化权重矩阵
  transformer = TfidfTransformer(norm='l1') 
  tfidf = transformer.fit_transform(vectorizer.fit_transform(corpus))

  words = vectorizer.get_feature_names_out()  # 所有文本的关键字
  weight = tfidf.toarray()  # 对应的tfidf矩阵
  kw=[]
  for element in words:
    kw.append(element)

  return {"kw":kw,"weight":weight}
  


if __name__ == '__main__':
  corpus = [  u"我 来到 北京 清华大学",
     u"我 爱 北京 天安门",
     u"今天 天气 不错",
     u"南哪大学 是 一所 二本 大学",]
  dw = Tfidf(corpus)

  # 获得文档权重矩阵
  print(dw["kw"])
  print("文档d权重矩阵",dw["weight"])

  # 获得查询文本q的权重矩阵
  q=[u"天安门"]
  qw1=Tfidf(q)
  qw=[]
  for i in dw["kw"]:
    if i in qw1["kw"]:
      qw.append(qw1["weight"][0][qw1["kw"].index(i)])
    else:
      qw.append(0)
  qw = np.array(qw)
  print("查询文本q",q)
  print("查询文本q权重矩阵",qw)

  # 计算查询文本q和目标文本d的相似度
  # 相似度阈值，大于该阈值的文本才视为相似文本
  thres=0.2
  max=0
  maxindexs=[]
  for i in range(len(dw["weight"])):
    simqi=cosine_similarity(qw.reshape(1,-1),dw["weight"][i].reshape(1,-1))
    
    if simqi[0][0]>=max and simqi[0][0]!=0 and simqi[0][0]>=thres:
      max=simqi[0][0]
      maxindexs.append(i)
    print("cos_sim(q,%s)=%s"%(i,simqi[0][0]))
  if(max!=-1):
    print("最大相似度为：",max)
    print("相似文本id集合为：",maxindexs)
  else:
    print("无相似文本")