package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.Reason;

/**
 * @author nakagawatomoya
 * 根拠テーブルから情報を取得するためのマッパー
 */

@Mapper
public interface ReasonMapper {
	public List<Reason> selectReason();

}
