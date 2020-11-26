package jp.co.runy.logical_thinking.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.runy.logical_thinking.domain.Framework;
import jp.co.runy.logical_thinking.domain.FrameworkKind;
import jp.co.runy.logical_thinking.mapper.FrameworkKindMapper;

@Service
public class FrameworkKindService {

    @Autowired
    private FrameworkKindMapper frameworkKindMapper;

    /**
     * フレームワークの一覧をフレームワーク種別から取得するメソッド.
     * 
     * @return Map<Integer, List<Framework>> フレームワークのマップオブジェクト
     */
    public Map<Integer, List<Framework>> findAll() {
        final List<FrameworkKind> frameworkKindList = frameworkKindMapper.findFrameworkKind();
        final Map<Integer, List<Framework>> frameworkMap = frameworkKindList.stream()
                .collect(Collectors.toMap(fk -> fk.getId(), fk -> fk.getFrameworkList()));
        System.out.println(frameworkMap);
        return frameworkMap;
    }

}
