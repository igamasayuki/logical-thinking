package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.LogicTree;

/**
 * @author takahashikouhei
 * ロジックツリーテーブルから情報を取得するためのマッパー
 */
@Mapper
public interface LogicTreeMapper {
	int upsert(LogicTree logicTree);
	public LogicTree selectLogicTree();
}
