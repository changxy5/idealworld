# 基于二值权重的概率检索

# input：1、已做分词的Di集合数组（二元数组，空格作为分隔符）：[[aa bbb cc],[aaa bbbb cc],[a bb c]...](顺序=id)
## 2、已做分词的Q数组：[aa bbb cc]

# output：最大相似度文本的id集合

kw=[] # 关键词矩阵

# 
def Prob(cps):
  # 参数设定
  ptr=0.5 # P(ti|R)
  ptnr = 0 # P(ti|nR)
  wij=get_wij(doc) # wij
  wiq=[] # wiq

  return {"kw":kw,"weight":weight}
  
def get_wij(doc):
  dfi=[] # dfi

  return wij

if __name__ == '__main__':
  D = [  u"我 来到 北京 清华大学",
     u"我 爱 北京 天安门",
     u"今天 天气 不错",
     u"南哪大学 是 一所 二本 大学",]

  # 获得查询文本q的权重矩阵
  Q=[u"天安门"]
