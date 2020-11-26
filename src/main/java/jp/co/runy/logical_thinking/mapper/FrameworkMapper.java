package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.Framework;

/**
 * @author takahashikouhei
 * フレームワークテーブルから情報を取得するためのマッパー
 */
@Mapper
public interface FrameworkMapper {
	List<Framework> findAll();
	List<Framework> findFramework(int id);
}