package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.Pyramid;

/**
 * @author nakagawatomoya
 * ピラミッドテーブルから情報を取得するためのマッパー
 */
@Mapper
public interface PyramidMapper {
	public List<Pyramid> selectPyramid();

}
