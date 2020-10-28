package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.Example;

/**
 * @author nakagawatomoya
 * 証拠テーブルから情報を取得するためのマッパー
 */

@Mapper
public interface ExampleMapper {
	public List<Example> selectExample();

}
