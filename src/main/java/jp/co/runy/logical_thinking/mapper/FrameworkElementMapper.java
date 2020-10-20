package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.FrameworkElement;
/**
 * @author takahashikouhei
 * フレームワークの要素を取得するMapper
 * ajaxで使用するapi
 */
@Mapper
public interface FrameworkElementMapper {
	List<FrameworkElement> findFrameworkElementById(int id);
}
