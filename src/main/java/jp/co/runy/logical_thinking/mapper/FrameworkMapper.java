package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.FrameworkElement;

/**
 * @author takahashikouhei
 * フレームワークテーブルから情報を取得するためのマッパー
 */
@Mapper
public interface FrameworkMapper {
	List<Framework> findramework();
	List<Framework> findFramework(int id);
}