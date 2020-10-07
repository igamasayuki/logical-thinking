-- FWをまとめるもの
create table if not exists frameworkkind (
    id serial primary key,
    summary text
);
-- フレームワーク
create table if not exists framework (
    id serial primary key,
    frameworkkindtype integer,
    content text,
    foreign key (frameworkkindtype) references frameworkkind(id)
);
-- フレームワークの要素
create table if not exists frameworkelement (
    id serial primary key,
    frameworktype integer, 
    element text,
    foreign key frameworktype references framework(id)
);
-- ロジックツリー
create table if not exists logictree (
    id serial primary key,
    -- 相手が欲しいもの
    partnerwants text,
    -- あなたの状態
    currentState text,
    -- 原因/方法
    descriptionType integer,
    frameworkType integer,
    -- 主張
    insistence text, 
    foreign key (frameworkType) references framework(id)
);
-- 第一階層
create table if not exists firsthierarchy (
    id serial primary key,
    -- フレームワークの要素
    word text,
    -- 言い換えると「〜」
    anotherword text,
    logictreeid integer,
    foreign key (logictreeid) references logictree(id)
);
-- 第二階層
create table if not exists secondhierarchy (
    id serial primary key,
    -- 説明
    explanation text,
    firsthierarchyid integer,
    foreign key (firsthierarchyid) references firsthierarchy(id)
);
-- 第三階層
create table if not exists thirdhierarchy (
    id serial primary key,
    explanation text,
    secondhierarchyid integer,
    foreign key (secondhierarchyid) references secondhierarchy(id)
);
-- 
create table if not exists pyramid (
    id serial primary key,
    frameworkkindtype integer,
    frameworkType integer,
    -- 結論
    conclusion text,
    foreign key frameworkkindtype references frameworkkind(id),
    foreign key frameworkType references framework(id)
);

create table if not exists reason (
    id serial primary key,
    -- 「〇〇に関する」の〇〇?(ex. カネ, モノなど) => 根拠のカラムが必要
    -- 根拠のこと? => 他テーブルのカラム名と意味が異なる
    word text,
    -- 他テーブルのカラム名から「言い換えると」のカラムを追加
    anotherword text,
    explanation text,
    pyramidid integer,
    foreign key pyramidid references pyramid(id)
);

create table if not exists example (
    id serial primary key,
    explanation text,
    reasonid integer,
    foreign key reasonid references reason(id)
);