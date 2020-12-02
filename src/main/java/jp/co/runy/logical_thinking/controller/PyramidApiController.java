package jp.co.runy.logical_thinking.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jp.co.runy.logical_thinking.domain.Pyramid;
import jp.co.runy.logical_thinking.exception.SessionTypeConversionExeption;
import jp.co.runy.logical_thinking.service.PyramidService;
import jp.co.runy.logical_thinking.util.SessionTypeConversion;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static jp.co.runy.logical_thinking.util.SessionKeyUtil.*;

@RestController
@RequestMapping("/api/pyramid")
public class PyramidApiController {
    
    @Autowired
    PyramidService pyramidService;
    
    /** 
     * 直前に登録したピラミッドを取得するメソッド.
     * 
     * @param session セッションオブジェクト
     * @return Map<String, Pyramid> 直前に登録したピラミッド 
     * @throws SessionTypeConversionExeption セッション型変換エラーのえぐぜぷしょんクラス
     */
    @GetMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Pyramid> getPyramid(HttpSession session) throws SessionTypeConversionExeption {
        final Map<String, Pyramid> resultMap = new HashMap<>();
        if (session.getAttribute(SESSION_PYRAMID_ID_KEY) != null) {
            final Integer id = new SessionTypeConversion()
                    .typeConversionStringToInteger(session.getAttribute(SESSION_PYRAMID_ID_KEY));
            final Pyramid pyramid = pyramidService.findPyramid(id, session.getId());
            resultMap.put("Pyramid", pyramid);
        }
        return resultMap;
    }
}
