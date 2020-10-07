insert into logictree (partnerwants,currentState,descriptionType,frameworkType,insistence) values 
(
    'コミュニケーションが普通に取れる人月30万円程度のJavaのWebエンジニアを派遣して欲しい',
    'コミュニケーションが取れるJavaのWebエンジニアは人月40万円が相場である',
    1,
    1,
    '30万円のエンジニアを提案する'
);

insert into firsthierarchy (word,anotherword,logictreeid) values
(
    'ヒト',
    'JAVAエンジニア',
    1
),
(
    'モノ',
    '設備',
    1
),
(
    'カネ',
    'エンジニア単価',
    1
),
(
    '情報',
    'エンジニア派遣の市況'
    1
);

insert into secondhierarchy (explanation,firsthierarchyid) values
(
    '30万円のエンジニアを提案する',
    1
),
(
    '相場通りのエンジニアをご検討いただく',
    1
),
(
    'リモートワークにする',
    2
),
(
    'ハイスペックPCを支給する',
    2
),
(
    'たつや学長の誰でも完璧メールを使う',
    2
),
(
    '３ヶ月分一括払いにしてもらえれば20%ディスカウントにする',
    3
),
(
    '成果が出せていなければ値引きする',
    3
),
(
    '派遣したエンジニアから取れないような情報の差分を自社から提供する',
    4
),
(
    '毎月お得な技術情報をお客様に配信する',
    4
);

insert into thirdhierarchy (explanation,secondhierarchyid) values 
(
    'コミュニケーションは取れないが安いエンジニアを提案する',
    1
),
(
    'コミュニケーションは取れるがJavaの経験が浅いエンジニアを提案する',
    1
),
(
    '値段は高いがコミュニケーションが取れるJavaのエンジニアをご検討いただく',
    2
);

insert into pyramid (frameworkkindtype,frameworkType,conclusion) values 
(
    1,
    1,
    '自社、競合、顧客、チャネルの観点から30万円のエンジニアを提案する'
);

insert into reason (word,anotherword,explanation,pyramidid) values 
(
    
)