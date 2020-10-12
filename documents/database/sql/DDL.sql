-- FWをまとめるもの
create table if not exists framework_kinds (
    id serial primary key,
    summary text
);
-- フレームワーク
create table if not exists frameworks (
    id serial primary key,
    framework_kind_id integer,
    content text,
    foreign key (framework_kind_id) references framework_kinds(id)
);
-- フレームワークの要素
create table if not exists framework_elements (
    id serial primary key,
    framework_id integer, 
    element text,
    foreign key (framework_id) references frameworks(id)
);
-- ロジックツリー
create table if not exists logic_trees (
    id serial primary key,
    -- 相手が欲しいもの
    partner_wants text,
    -- あなたの状態
    current_state text,
    -- 原因/方法
    description_type integer,
    framework_id integer,
    -- 主張
    insistence text, 
    foreign key (framework_id) references frameworks(id)
);
-- 第一階層
create table if not exists first_hierarchies (
    id serial primary key,
    -- フレームワークの要素
    word text,
    -- 言い換えると「〜」
    another_word text,
    logic_treeid integer,
    foreign key (logic_tree_id) references logic_trees(id)
);
-- 第二階層
create table if not exists second_hierarchies (
    id serial primary key,
    -- 説明
    explanation text,
    first_hierarchy_id integer,
    foreign key (first_hierarchy_id) references first_hierarchies(id)
);
-- 第三階層
create table if not exists third_hierarchies (
    id serial primary key,
    explanation text,
    second_hierarchy_id integer,
    foreign key (second_hierarchy_id) references second_hierarchies(id)
);
-- 
create table if not exists pyramids (
    id serial primary key,
    framework_kind_id integer,
    framework_id integer,
    -- 結論
    conclusion text,
    foreign key (framework_kind_id) references framework_kinds(id),
    foreign key (framework_id) references frameworks(id)
);

create table if not exists reasons (
    id serial primary key,
    -- 「〇〇に関する」の〇〇?(ex. カネ, モノなど) => 根拠のカラムが必要
    -- 根拠のこと? => 他テーブルのカラム名と意味が異なる
    word text,
    -- 他テーブルのカラム名から「言い換えると」のカラムを追加
    another_explanation text,
    explanation text,
    pyramid_id integer,
    foreign key (pyramid_id) references pyramids(id)
);

create table if not exists examples (
    id serial primary key,
    explanation text,
    reason_id integer,
    foreign key (reason_id) references reasons(id)
);