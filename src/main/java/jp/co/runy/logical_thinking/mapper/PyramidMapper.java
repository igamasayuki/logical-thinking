package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import jp.co.runy.logical_thinking.domain.Pyramid;

/**
 * @author nakagawatomoya
 * ピラミッドテーブルから情報を取得するためのマッパー
 */
@Mapper
public interface PyramidMapper {
	public List<Pyramid> selectPyramid(String sessionId);

	public Integer insert(Pyramid bean, String sessionId);

	public Pyramid findPyramid(@Param("pyramidId") Integer id, @Param("sessionId") String sessionId);

}
