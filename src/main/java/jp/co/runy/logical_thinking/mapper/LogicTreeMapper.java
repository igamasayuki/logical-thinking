package jp.co.runy.logical_thinking.mapper;

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

	public LogicTree findBySessionId(String sessionId);
}
